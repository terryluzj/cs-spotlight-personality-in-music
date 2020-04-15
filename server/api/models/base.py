import decimal
import json
import time
import uuid
from datetime import datetime

from . import DB
from boto3.dynamodb.conditions import Attr


class DecimalEncoder(json.JSONEncoder):
    """
    Helper class to convert a DynamoDB item to JSON

    From https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.Python.03.html#GettingStarted.Python.03.02
    """

    def default(self, o):
        if isinstance(o, decimal.Decimal):
            if o % 1 > 0:
                return float(o)
            else:
                return int(o)
        return super(DecimalEncoder, self).default(o)


class BaseModel:
    """
    Base model to interact with DynamoDB instance

    :return: Base model object
    :rtype: BaseModel
    """

    def __init__(self):
        self.table = DB.Table(self.table_name)

    def create(self, item):
        """
        Create an item

        :param item: Item data
        :type item: dict
        :return: Database response object
        :rtype: dict
        """
        item[self.id_key] = str(uuid.uuid4())
        item["created_at"] = int(time.mktime(datetime.now().timetuple()))
        self.table.put_item(Item=item)
        return item

    def get(self, id, use_json=False):
        """
        Get an item

        :param id: ID tag
        :type id: str
        :param use_json: Boolean flag to transform to standard JSON data
        :type id: bool
        :return: Database response object
        :rtype: dict
        """
        try:
            item = self.table.get_item(Key={self.id_key: id})["Item"]
            if use_json:
                return json.loads(json.dumps(item, cls=DecimalEncoder))
            else:
                return item
        except KeyError:
            return None

    def remove_field(self, item_id, field_string):
        """
        Remove a filed from an item

        :param id: ID tag
        :type id: str
        :param field_string: Field path string
        :type field_string: str
        :return: Database response object
        :rtype: dict
        """
        return self.table.update_item(
            Key={self.id_key: item_id}, UpdateExpression=f"remove {field_string}",
        )

    def update(self, item_id, update_fields):
        """
        Update an item

        :param id: ID tag
        :type id: str
        :param update_fields: Field key-value pair mapping
        :type update_fields: dict
        :return: Database response object
        :rtype: dict
        """
        update_string = ", ".join(
            [
                f"{key_name}=:val{index}"
                for index, key_name in enumerate(update_fields.keys())
            ]
        )
        update_value_map = {
            f":val{index}": update_fields[key_name]
            for index, key_name in enumerate(update_fields.keys())
        }
        return self.table.update_item(
            Key={self.id_key: item_id},
            UpdateExpression=f"set {update_string}",
            ExpressionAttributeValues=update_value_map,
        )

    def query(self, field_attributes={}):
        """
        Query an item by field attributes

        :param field_attributes: Field attribute-value mapping
        :type field_attributes: dict
        :return: Database response object
        :rtype: dict
        """
        expression = None
        for attr in field_attributes.keys():
            if expression is None:
                expression = Attr(attr).eq(field_attributes[attr])
            else:
                expression = expression & Attr(attr).eq(field_attributes[attr])
        try:
            return self.table.query(FilterExpression=expression)["Items"]
        except KeyError:
            return []

    def scan(self):
        """
        Scan through the entire table

        :return: Database response object
        :rtype: dict
        """
        try:
            return self.table.scan()["Items"]
        except KeyError:
            return []

    def delete(self, item_id):
        """
        Delete an item

        :param id: ID tag
        :type id: str
        :return: Database response object
        :rtype: dict
        """
        return self.table.delete_item(Key={self.id_key: item_id})

    @property
    def table_name(self):
        raise NotImplementedError("Table name property not implemented.")

    @property
    def id_key(self):
        return "id"

# React.js Frontend for SpotLight

> Please refer to README in [top page](https://github.com/terryluzj/cs-spotlight-personality-in-music/) for project setup related to the frontend application.

## Folder Structure

```
.
├───config                  # Testing and Webpack configuration after ejecting
│   └───jest                # Testing transform scripts
├───public                  # Public static content
└───src
    ├───assets              # Common assets
    ├───components          # UI/Visual components
    ├───containers          # Container components with hook usage and redux
    │   ├───App             # Top level application container
    ├───hooks               # React hooks to be used by containers
    ├───redux
    │   ├───actions         # Redux action constants
    │   ├───reducers        # Redux reducer functions
    │   ├───saga            # Redux sage async handlers
    │   └───selectors       # Redux store state selector functions
    └───utils
        ├───api             # Common API agent
        └───oauth-service   # OAuth Service Handler
```
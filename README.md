# Sauce app

Built using react and express

Deployed at [Sauce App](https://pacific-mountain-45451.herokuapp.com/)

## api endpoint

- get /api/all  
  Return all sauce

- get /api/sauce/{tag}  
  Return sauce tagged with {tag}

- post /api/add  
  Adds sauce to db

```
body: {
    code: "177013", tags: "Sad"
}
```

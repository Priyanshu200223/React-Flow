This is a starter template for [Learn Next.js](https://nextjs.org/learn).

1. Setting up the project

    I would create a react application with next-js and build a single page to complete the required task
    To get to things faster, I might go with mui design library, if you suggest something else, I'm okay with that.
    State Management: For managing state we might go with redux-toolkit, react-query, or React's inbuilt context-API support. If you're opinionated about something, please let me know.

2. Create the Canvas:

    I've understood that I have to create a canvas on which react-flow elements/nodes would lie and there is a requirement of making three nodes, it is highly likely that there might be more nodes to be added dynamically in future (might be a good extension to the current task), so I'll make sure to be following that level of dynamism in the code.

3. Configuring Nodes:

    Each node would be backed by a schema with form-data following the schema structure.
    Now the big question lies in choosing schema-spec, we could create our own schema-spec that our UI understands, or we can use openJS's json schema specification  to render JSF form. I'm opiniated about using jsf (I think the task also signals it) to render forms based on json-schema.
    Rendering JSON Form using json-schema: Rendering of form based on schema could be drived by RJSF, a library which is built for this purpose. If you like to see how it looks, here is the interactive-playground

4. Endpoints:

    The schema while configuring nodes would be served by a mock server,  I've not yet decided the mocking platform to use, but I'll choose from the three suggestions provided. Axios mock could also have worked  (but I understand why you didn't suggest it).

5. Integration:

    Complete component-flow might look like this where the server is the one holding the stateful persistent data, which has to sync with stateless front-end application.

![](./public/Screenshot%202023-06-28%20at%201.42.52%20PM.png)
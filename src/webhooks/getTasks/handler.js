/**
 * This file was generated using 8base CLI.
 *
 * To learn more about writing custom GraphQL resolver functions, visit
 * the 8base documentation at:
 *
 * https://docs.8base.com/8base-console/custom-functions/webhooks
 *
 * To update this functions invocation settings, update its configuration block
 * in the projects 8base.yml file:
 *  functions:
 *    getTasks:
 *      ...
 *
 * Data that is sent to the function can be accessed on the event argument at:
 *  event.data[KEY_NAME]
 *
 * There are two ways to invoke this function locally:
 *
 *  (1) Explicit file mock file path using '-p' flag:
 *    8base invoke-local getTasks -p src/resolvers/getTasks/mocks/request.json
 *
 *  (2) Default mock file location using -m flag:
 *    8base invoke-local getTasks -m request
 *
 *  Add new mocks to this function to test different input arguments. Mocks can easily be generated
 *  the following generator command:
 *    8base generate mock getTasks -m [MOCK_FILE_NAME]
 */
import gql from "graphql-tag";
//creamos la query
const TOGGLE_TASK_MUTATION = gql`
  mutation TaskToggle($id: ID!, $state: Boolean!) {
    taskUpdate(filter: { id: $id }, data: { state: $state }) {
      id
      _description
      state
    }
  }
`;

module.exports = async (event, ctx) => {
  const data = JSON.parse(event.body);
  let response;
  //intentamos ejecutar ka query
  try {
    response = await ctx.api.gqlRequest(TOGGLE_TASK_MUTATION, {
      id: data.id,
      state: data.state,
    });
  } catch (e) {
    return responseBuilder(422, "Failed to update invoice");
  }
};

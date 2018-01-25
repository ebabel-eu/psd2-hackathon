const removeLast = require('./remove-last');

const entityCrud = (entity, ids = '/:appID/:bankID') => {
  const singleEntity = removeLast(entity);
  const id = `${singleEntity}ID`;

  return {
    entity,
    link: [
      {
        rel: 'Create',
        method: 'POST',
        url: `/api/v1${ids}/${entity}`,
        description: `Create a new ${singleEntity}.`
      },
      {
        rel: 'Read',
        method: 'GET',
        url: `/api/v1${ids}/${entity}/:${id}`,
        description: `Read details of a single ${singleEntity}.`
      },
      {
        rel: 'Update',
        method: 'PUT',
        url: `/api/v1${ids}/${entity}/:${id}`,
        description: `Update an existing ${singleEntity}.`
      },
      {
        rel: 'Delete',
        method: 'DELETE',
        url: `/api/v1${ids}/${entity}/:${id}`,
        description: `Delete a single ${singleEntity}.`
      },
      {
        rel: 'List',
        method: 'GET',
        url: `/api/v1${ids}/${entity}`,
        description: `List all ${entity}.`
      }
    ]
  };
};

module.exports = entityCrud;

export const actionTypes = { UPDATE_DATA: 'UPDATE_DATA' }

export function pieDataUpdateAction() {
    console.log("updating")
  return { type: actionTypes.UPDATE_DATA }
}

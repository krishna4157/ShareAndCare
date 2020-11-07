
export const SELECT_VISIT_FORM = "SELECT_VISIT_FORM";

const selectVisitFormSuccess = (visitFormOid) => ({
    type: SELECT_VISIT_FORM,
    visitFormOid: visitFormOid,
});

export const selectVisitForm = (visitFormId) => dispatch => {
    dispatch(selectVisitFormSuccess(visitFormId));
}

import * as actions from '../constants/actions';

export const updateEditorState = (editorState) => ({
  type: actions.UPDATE_EDITOR_STATE,
  editorState,
});

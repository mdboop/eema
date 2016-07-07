export default function editorReducer(state = { editorState: 'EditorState.createEmpty()' }, action) {
  switch (action.type) {
    case 'UPDATE_EDITOR_STATE':
      console.log(action.editorState);
      return Object.assign({}, state, { editorState: action.editorState });
    default:
      return state;
  }
}

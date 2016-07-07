import React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import InlineStyleControls from './components/InlineStyleControls';
import BlockStyleControls from './components/BlockStyleControls';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateEditorState } from './actions/actionCreators';

const mapStateToProps = (state) => ({
  editorState: state.editorState,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ updateEditorState }, dispatch),
});

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
}

class MainEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = (editorState) => this.setState({ editorState });
    this.toggleInlineStyle = (style) => this.handleInlineStyleToggle(style);
    this.toggleBlockType = (type) => this.handleBlockTypeToggle(type);
    this.focus = this.focus.bind(this);

    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.handleSaveDraft = this.handleSaveDraft.bind(this);
  }
  focus() {
    this.refs.editor.focus();
  }
  handleBlockTypeToggle(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }
  handleInlineStyleToggle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }
  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }
  handleSaveDraft() {
    this.props.actions.updateEditorState(this.state.editorState);
  }
  render() {
    const editorState = this.state.editorState;
    return (
      <div>
        <div className="editor--toolbar-container">
          <BlockStyleControls
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />
        </div>
        <div className="editor--container" onClick={this.focus}>
          <Editor
            customStyleMap={styleMap}
            blockStyleFn={getBlockStyle}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            ref="editor"
          />
        </div>
        <button
          className="button--save-draft"
          onClick={this.handleSaveDraft}
        >Save Draft</button>
      </div>
    );
  }
}

MainEditor.propTypes = {
  editorState: React.PropTypes.object,
  actions: React.PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainEditor);

import React from 'react';
import { PrimaryButton, Stack, Label, mergeStyleSets } from 'office-ui-fabric-react';
// import { ITranspileOutput } from '../transpiler/transpile.types';
import { transpile, _evalCode, transpileTSW } from '../transpiler/transpile';

const classNames = mergeStyleSets({
  code: {
    fontFamily: 'monospace',
    fontSize: 13,
    lineHeight: '1.5'
  },
  renderSection: {
    backgroundColor: 'red'
  },
  error: {
    backgroundColor: '#FEF0F0',
    color: '#FF5E79'
  },
  editor: {
    width: 800,
    height: 500
  }
});

interface IAppState {
  code: string;
  JScode: string;
  error?: string;
  fontSize?: string;
  editorHidden?: boolean;
  editor?: JSX.Element;
  currentTime: number;
  renderedCode?: any;
}

export class App extends React.Component {
  public state: IAppState = {
    code: '',
    JScode: '',
    editor: undefined,
    currentTime: 0,
    editorHidden: true
  };

  public componentDidmount(){
    const reactInit = `{
      react: "React"
    },`;
    try{
      eval(reactInit);
    }catch(ex){
      console.log(ex.message)
    }
  }

  private onChange = (newVal: string, editor: any) => {
    const rendered = _evalCode(transpile(newVal)!.outputString!);
    transpileTSW(newVal, editor)
    if(rendered.outputHTML){
      this.setState({
        renderedCode: rendered.outputHTML,
        error: undefined
      });
    }else{
      this.setState({
        renderedCode: undefined,
        error: rendered.error
      });
    }
  };

  private buttonClicked = (): void => {
    if (this.state.editorHidden) {
      require.ensure([], require => {
        const Editor = require('../components/Editor').Editor;
        this.setState({
          editor: (
            <div>
              <div>
                <Label>Typescript + React editor</Label>
              </div>
              <React.Suspense fallback={<div>Loading...</div>}>
                <Editor width={800} height={500} code="" language="typescript" onChange={this.onChange} />
              </React.Suspense>
            </div>
          ),
          editorHidden: false
        });
      });
    } else {
      this.setState({ editor: null, editorHidden: true });
    }
  };

  public render() {
    const editor = (
      <Stack style={{ backgroundColor: 'lightgray' }} gap={4}>
        {!this.state.editorHidden && this.state.editor}
        {this.state.error !== undefined && <Label className={classNames.error}>`{this.state.error}`</Label>}
      </Stack>
    );

    return (
      <div>
        <PrimaryButton onClick={this.buttonClicked} />
        {!this.state.editorHidden && editor}
        <div id='output'></div>
      </div>
    );
  }
}


import React, {ChangeEvent, FC, useState} from 'react';

export const Controls: FC<IControlsProps> = ({ actionCallback }) => {
  const [text, setText] = useState('PLACE_ROBOT 2,3,NORTH');
  // const [instructions, setInstructions] = useState(['PLACE_ROBOT 2,3,NORTH']);

  function handleChange(event: ChangeEvent) {
    // Prevent the browser from reloading the page
    event.preventDefault();

    // @ts-ignore
    const instructionsArray = event.target.value;
    console.log(instructionsArray)
    setText(instructionsArray)
  }
  const onButtonClick = () => {
    const instructions = text.replace(/\r\n/g,"\n").split("\n");
    actionCallback(instructions);
  };

  return (
    <div>
      <h2>Controls</h2>
      {/*<form method="post" onSubmit={handleSubmit}>*/}
        <textarea name="actionTextArea" id="actionTextArea" cols={30} rows={10} value={text} onChange={handleChange} />
        <button onClick={onButtonClick}>GO!</button>
      {/*</form>*/}
    </div>
  );
}

interface IControlsProps {
  actionCallback: (action: string[]) => void;
}

export function transformExample (exampleText?: string, className?: string) {
  const identifierPattern = new RegExp(/(?<=import { )(.*)(?= } from 'office-ui-fabric-react)/, 'g');
  const importPattern = new RegExp(/(import.+?;\n)/,'g');
  const classNametemp = 'DropdownBasicExample';
  let identifiers: string[] = [];
  let imports: string[] = [];
  let temp;

  while(temp = identifierPattern.exec(example)) {
    temp[0].split(', ').map(identifier => identifiers.push(identifier));
  }

  while(temp = importPattern.exec(example)) {
    imports.push(temp[0]);
  }

  imports.map(imp => example = example.replace(imp, ''));
  example = example.replace('export ', '');
  example =
    'const {' +
    identifiers.map(identifier => ' '+identifier) +
    ', Fabric } = window.Fabric;\n' +
    example +
    `
    ReactDOM.render(
    <Fabric>
      <${classNametemp} />
    </Fabric>,
    document.getElementById('output')
  );`;
  console.log(example)
  return example
}

let example = `
import * as React from 'react';
import { IStackTokens, Stack } from 'office-ui-fabric-react/lib/Stack';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 }
};

const options: IDropdownOption[] = [
  { key: 'fruitsHeader', text: 'Fruits', itemType: DropdownMenuItemType.Header },
  { key: 'apple', text: 'Apple' },
  { key: 'banana', text: 'Banana' },
  { key: 'orange', text: 'Orange', disabled: true },
  { key: 'grape', text: 'Grape' },
  { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
  { key: 'vegetablesHeader', text: 'Vegetables', itemType: DropdownMenuItemType.Header },
  { key: 'broccoli', text: 'Broccoli' },
  { key: 'carrot', text: 'Carrot' },
  { key: 'lettuce', text: 'Lettuce' }
];

const stackTokens: IStackTokens = { childrenGap: 20 };

export const DropdownBasicExample: React.StatelessComponent = () => {
  return (
    <Stack tokens={stackTokens}>
      <Dropdown placeholder="Select an option" label="Basic uncontrolled example" options={options} styles={dropdownStyles} />

      <Dropdown
        label="Disabled example with defaultSelectedKey"
        defaultSelectedKey="broccoli"
        options={options}
        disabled={true}
        styles={dropdownStyles}
      />

      <Dropdown
        placeholder="Select options"
        label="Multi-select uncontrolled example"
        defaultSelectedKeys={['apple', 'banana', 'grape']}
        multiSelect
        options={options}
        styles={dropdownStyles}
      />
    </Stack>
  );
};`;
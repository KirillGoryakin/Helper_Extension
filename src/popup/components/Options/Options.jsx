import { observer } from "mobx-react-lite";
import OptionsStore from "../../optionsStore";
import { OptionHeading } from "./OptionHeading";
import { OptionItem } from "./OptionItem";
import { OptionList } from "./OptionList";

const Options = observer(() => {

  const itemProps = (key) => ({
    value: OptionsStore.options[key],
    setValue: (value) => OptionsStore.setOptions(
      options => ({ ...options, [key]: value })),
  });

  return (
    <div>
      <OptionHeading>Calculating</OptionHeading>
      <OptionList>
        <OptionItem {...itemProps('calculating.enable')}>Enable</OptionItem>
      </OptionList>

      <OptionHeading>Currency convertation</OptionHeading>
      <OptionList>
        <OptionItem {...itemProps('currency.enable')}>Enable</OptionItem>
      </OptionList>

      <OptionHeading>Translation</OptionHeading>
      <OptionList>
        <OptionItem {...itemProps('translation.enable')}>Enable</OptionItem>
      </OptionList>
    </div>
  )
});

export { Options };
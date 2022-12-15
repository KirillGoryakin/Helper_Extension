import { observer } from "mobx-react-lite";
import OptionsStore from "../../optionsStore";
import { QuestionIcon } from '@chakra-ui/icons';
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
        <OptionItem
          {...itemProps('calculating.enable')}
        >
          Enable
        </OptionItem>
      </OptionList>

      <OptionHeading>Currency convertation</OptionHeading>
      <OptionList>
        <OptionItem
          {...itemProps('currency.enable')}
        >
          Enable
        </OptionItem>
      </OptionList>

      <OptionHeading>Translation</OptionHeading>
      <OptionList>
        <OptionItem
          {...itemProps('translation.enable')}
        >
          Enable
        </OptionItem>
        <OptionItem
          {...itemProps('translation.apiKey')}
          type='text'
          placeholder='API key'
        >
          API key
          <a href="https://github.com/KirillGoryakin/Helper_Extension" target='_blank'>
            <QuestionIcon
              w={3} h={3} mt={1} ml={1}
              verticalAlign='top'
              transition='color 0.15s ease-in-out'
              _hover={{
                color: 'secondary.600'
              }}
            />
          </a>
        </OptionItem>
      </OptionList>
    </div>
  )
});

export { Options };
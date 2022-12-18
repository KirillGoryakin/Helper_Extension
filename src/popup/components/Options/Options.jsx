import { observer } from "mobx-react-lite";
import Store from "../../Store";
import { SetToDefault } from "./SetToDefault";
import { QuestionIcon } from '@chakra-ui/icons';
import { OptionHeading } from "./OptionHeading";
import { OptionItem } from "./OptionItem";
import { OptionList } from "./OptionList";
import { Button, Select } from "@chakra-ui/react";
import languages from '../../languages.json';
import { mostTraded, crypto, other } from '../../../currencies.json';

const currencies = mostTraded.concat(other).concat(crypto);

const Options = observer(() => {

  const itemProps = (key) => ({
    value: Store.options[key],
    setValue: (value) => Store.setOptions(
      options => ({ ...options, [key]: value })),
  });

  return (
    <div>
      <SetToDefault />
      
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
        <OptionItem
          type='custom'
          element={
            <Select
              size='sm'
              variant='filled'
              w={175}
              value={Store.options['currency.convertTo']}
              onChange={e => Store.setOptions(options => ({
                ...options,
                ['currency.convertTo']: e.target.value
              }))}
            >
              {currencies.map(curr =>
                <option key={curr.code} value={curr.code}>
                  {curr.name}
                </option>
              )}
            </Select>
          }
        >
          Convert to
        </OptionItem>
      </OptionList>

      <OptionHeading>Translation</OptionHeading>
      <OptionList>
        <OptionItem
          {...itemProps('translation.enable')}
          disabled={Store.options['translation.apiKey'] ? false : true}
        >
          Enable
        </OptionItem>
        <OptionItem
          {...itemProps('translation.apiKey')}
          type='text'
          placeholder='API key'
        >
          API key
          <a href="https://github.com/KirillGoryakin/Hint_Extension#getKey" target='_blank'>
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
        <OptionItem
          type='custom'
          element={
            <Select
              size='sm'
              variant='filled'
              w={175}
              value={Store.options['translation.language']}
              onChange={e => Store.setOptions(options => ({
                  ...options,
                  ['translation.language']: e.target.value
                }))}
            >
              {languages.map(lang => 
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              )}
            </Select>
          }
        >
          Translate to
        </OptionItem>
        <Button
          onClick={Store.clearTranslationCache}
          colorScheme='secondary'
          variant={Store.translationCache.length > 0 ? 'solid' : 'outline'}
          size='sm'
          minW={150}
          w='max-content'
          mx='auto'
          mt={2}
        >
          Clear Cache
        </Button>
      </OptionList>
    </div>
  )
});

export { Options };
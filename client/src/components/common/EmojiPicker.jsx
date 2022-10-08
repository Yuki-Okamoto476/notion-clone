import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Picker from '@emoji-mart/react';

const EmojiPicker = (props) => {
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [isShowPicker, setIsShowPicker] = useState(false);

  useEffect(() => {
    setSelectedEmoji(props.icon);
  }, [props.icon]);

  const showPicker = () => {
    setIsShowPicker(!isShowPicker);
  };

  const selectEmoji = (e) => {
    const emojiCode = e.unified.split('-');
    let codesArray = [];
    emojiCode.forEach((el) => codesArray.push('0x' + emojiCode));
    const emoji = String.fromCodePoint(...codesArray);
    setIsShowPicker(false)
    props.onChange(emoji)
  };

  return (
    <Box>
      <Typography
        variant='h3'
        fontWeight='700'
        sx={{ cursor: 'pointer' }}
        onClick={showPicker}
      >
        {selectedEmoji}
      </Typography>
      <Box
        sx={{ display: isShowPicker ? 'block' : 'none', position: 'absolute' }}
      >
        <Picker onEmojiSelect={selectEmoji} />
      </Box>
    </Box>
  );
};

export default EmojiPicker;

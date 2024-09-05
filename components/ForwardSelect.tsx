import React, { forwardRef } from 'react';
import { Select } from '@radix-ui/themes';

const ForwardedSelect = forwardRef<HTMLDivElement, React.ComponentProps<typeof Select.Root>>((props, ref) => {
  return (
    <Select.Root {...props} ref={ref as React.Ref<HTMLDivElement>}>
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          {props.children}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
});

ForwardedSelect.displayName = 'ForwardedSelect'; // For debugging purposes

<script lang="ts" setup>
  import { computed } from 'vue';
  import { VTextField } from 'vuetify/components';
  import { Date as GoogleTypeDate } from '@playground.exchange/protobuf/google/type/date_pb';

  type VTextFieldProps = InstanceType<typeof VTextField>['$props'];
  interface Props extends /* @vue-ignore */ VTextFieldProps {
    modelValue?: GoogleTypeDate;
  }

  // Defines props that the component accepts
  const props = defineProps<Props>();

  // Defines events that can be emitted by the component
  const emit = defineEmits<{
    (e: 'update:model-value', value: GoogleTypeDate): void;
  }>();

  const value = computed(() => {
    if (!props.modelValue) {
      return null;
    }

    return new Date(
      Date.UTC(
        props.modelValue.getYear(),
        props.modelValue.getMonth() - 1,
        props.modelValue.getDay(),
      ),
    )
      .toISOString()
      .slice(0, 10);
  });

  // Emit an event whenever the value changes
  const updateValue = (value: string) => {
    const date = new Date(value);

    const googleTypeDate = new GoogleTypeDate();
    googleTypeDate.setYear(date.getFullYear());
    googleTypeDate.setMonth(date.getMonth() + 1);
    googleTypeDate.setDay(date.getDate());

    emit('update:model-value', googleTypeDate);
  };
</script>

<template>
  <v-text-field
    v-bind="props"
    :model-value="value"
    type="date"
    @update:model-value="updateValue"
  />
</template>

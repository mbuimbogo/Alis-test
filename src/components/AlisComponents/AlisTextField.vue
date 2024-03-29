<script lang="ts" setup>
  import { computed } from 'vue';
  import { VTextField } from 'vuetify/components';

  type VTextFieldProps = InstanceType<typeof VTextField>['$props'];
  interface Props extends /* @vue-ignore */ VTextFieldProps {
    modelValue?: string;
  }

  // Defines props that the component accepts
  const props = defineProps<Props>();

  // Defines events that can be emitted by the component
  const emit = defineEmits<{
    (e: 'update:model-value', value: string): void;
  }>();

  const value = computed(() => {
    if (!props.modelValue) {
      return null;
    }
    return props.modelValue;
  });

  // Emit an event whenever the value changes
  const updateValue = (value: string) => {
    emit('update:model-value', value);
  };
</script>

<template>
  <v-text-field
    v-bind="props"
    :model-value="value"
    @update:model-value="updateValue"
  />
</template>

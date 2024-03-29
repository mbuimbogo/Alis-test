<script lang="ts" setup generic="EnumType extends object">
  import { getAllEnumEntries } from '../../utils/enums';
  import { computed } from 'vue';
  import { VSelect } from 'vuetify/components';

  type ValueOf<T> = T[keyof T];
  interface AlEnumSelectItem<Enum> {
    title: string;
    value: Enum;
  }

  type VSelectProps = InstanceType<typeof VSelect>['$props'];
  interface Props extends /* @vue-ignore */ VSelectProps {
    modelValue?: ValueOf<EnumType>;
    enumType: EnumType;
  }

  // Defines props that the component accepts
  const props = defineProps<Props>();

  // Defines events that can be emitted by the component
  const emit = defineEmits<{
    (e: 'update:model-value', value: ValueOf<EnumType>): void;
  }>();

  // Deconstruct the enum to an array of objects that can be passed to the items prop on the v-select
  // Each object has a title and value
  const items = computed(() => {
    const enumItems: AlEnumSelectItem<ValueOf<EnumType>>[] = [];

    if (!props.enumType) {
      return enumItems;
    }

    for (const [k, v] of getAllEnumEntries(props.enumType)) {
      enumItems.push({ title: (k as string).split('_').join(' '), value: v });
    }

    return enumItems;
  });

  // Emit an event whenever the value changes
  const updateValue = (value: ValueOf<EnumType>) => {
    emit('update:model-value', value);
  };
</script>

<template>
  <v-select
    v-bind="props"
    :items="items"
    item-title="title"
    item-value="value"
    :model-value="props.modelValue"
    @update:model-value="updateValue"
  />
</template>

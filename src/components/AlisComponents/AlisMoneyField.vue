<script lang="ts" setup>
  import { computed, type Ref, ref } from 'vue';
  import { VTextField } from 'vuetify/components';
  import {
    Money as GoogleTypeMoney,
    Money,
  } from '@playground.exchange/protobuf/google/type/money_pb';

  type VTextFieldProps = InstanceType<typeof VTextField>['$props'];
  interface Props extends /* @vue-ignore */ VTextFieldProps {
    modelValue?: GoogleTypeMoney;
  }

  // Defines props that the component accepts
  const props = defineProps<Props>();

  // Defines events that can be emitted by the component
  const emit = defineEmits<{
    (e: 'update:model-value', value: GoogleTypeMoney): void;
  }>();

  const value: Ref<GoogleTypeMoney | undefined> = ref(props.modelValue);

  // Ref Props
  const currency: Ref<string> = ref('');
  const amount: Ref<string> = ref('');

  // Watchers

  // Functions

  // displayMoneyValue
  function displayMoneyValue() {
    if (value.value) {
      return `${value.value.getUnits()}.${value.value.getNanos().toString().padStart(2, '0')}`;
    } else {
      return '';
    }
  }

  // saves and emmites the value to parent
  function save() {
    let float = parseFloat(amount.value).toFixed(2);

    let newMoney = new Money();
    newMoney.setCurrencyCode(currency.value);
    newMoney.setUnits(parseInt(parseFloat(float).toFixed(2).split('.')[0]));
    newMoney.setNanos(parseInt(parseFloat(float).toFixed(2).split('.')[1]));

    value.value = newMoney;

    emit('update:model-value', newMoney);
  }
</script>

<template>
  <v-text-field
    v-bind="props"
    :model-value="displayMoneyValue()"
    :prefix="value?.getCurrencyCode()"
  />
  <v-btn
    color="primary"
    variant="outlined"
    icon
    size="x-small"
    class="mb-6 ml-3"
  >
    <v-icon>menu</v-icon>

    <v-menu
      activator="parent"
      :close-on-content-click="false"
      :width="300"
    >
      <v-card>
        <v-card-title>Money Selector</v-card-title>
        <v-card-text class="mt-2">
          <v-row>
            <v-col cols="12">
              <v-select
                v-model="currency"
                label="Currency"
                :items="['EUR', 'USD', 'ZAR']"
                color="primary"
              ></v-select>
              <v-text-field
                v-model="amount"
                label="Value"
                hint="Format: 000.00"
                persistent-hint
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              class="d-flex justify-end pt-0"
            >
              <v-btn
                size="small"
                @click="save()"
              >
                save
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-menu>
  </v-btn>
</template>

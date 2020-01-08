import { OptionalKeys, RequiredKeys, Shape } from '@punchcard/shape';
import { ClassShape, ClassType } from '@punchcard/shape/lib/class';

declare module '@punchcard/shape/lib/shape' {
  export interface Shape {
    [AttributeValue.Tag]: AttributeValue.Type;
  }
}

// tslint:disable: ban-types

export namespace AttributeValue {
  export type Tag = typeof Tag;
  export const Tag = Symbol.for('@punchcard/shape-dynamodb.AttributeValue.Tag');

  export type Type =
    | AttributeValue.Binary
    | AttributeValue.BinarySet
    | AttributeValue.Bool
    | AttributeValue.List<any>
    | AttributeValue.Map<any>
    | AttributeValue.NumberSet
    | AttributeValue.NumberValue
    | AttributeValue.StringSet
    | AttributeValue.StringValue
    | AttributeValue.Struct<any>
    ;

  export type Of<T> = T extends { [Tag]: infer T2 } ? T2 : never;
  export type OfType<T> = Of<ClassShape<ClassType<T>>>;

  export interface Binary {
    B: Buffer;
  }
  export interface BinarySet {
    BS: Buffer[];
  }
  export interface Bool {
    BOOL: boolean;
  }
  export interface List<T extends Shape> {
    L: Array<Of<T>>;
  }
  export interface Map<T extends Shape> {
    M: {
      [key: string]: Of<T> | undefined;
    };
  }
  export interface Struct<T extends ClassShape<any>> {
    M: {
      [member in RequiredKeys<T['Members']>]: T['Members'][member]['Type'][AttributeValue.Tag];
    } & {
      [member in OptionalKeys<T['Members']>]+?: T['Members'][member]['Type'][AttributeValue.Tag];
    };
  }
  export interface NumberValue {
    N: string;
  }
  export interface NumberSet {
    NS: string[];
  }
  export interface StringValue {
    S: string;
  }
  export interface StringSet {
    SS: string[];
  }
}

//@flow
export type TypeDef<+Type, +Group> = {
  +type: Type,
  +group: Group,
  +data: any,
}

export type GraphiteMeta = {
  +next: TypeDef<*, 'step'>,
  +seq: TypeDef<'seq', 'step'>,
}
export function pushNext(
  add: TypeDef<'multi' | 'seq' | 'single', 'step'>,
  seq: TypeDef<'seq' | 'multi', 'step'>,
) {
  seq.data.push(add)
}
function fabricHandler(create) {
  if (typeof create === 'function') return create
  return _ => _
}

declare export function typeDef<T: {+[key: string]: any}, Group>(
  group: Group,
  t: T,
): $ObjMapi<T, <K>(k: K) => (data: any) => TypeDef<K, Group>>
export function typeDef(group, t) {
  const result = {}
  for (const key in t) {
    const handler = fabricHandler(t[key])
    result[key] = (...args) => ({
      type: key,
      group,
      data: handler(...args),
    })
  }
  return result
}

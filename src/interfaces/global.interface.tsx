export interface MutationParams<TData, TVariables> {
  onSuccess?: ((data: TData, variables: TVariables, context: unknown) => unknown) | undefined
  onError?: ((error: Error, variables: TVariables, context: unknown) => unknown) | undefined
}

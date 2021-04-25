export type Option<T> = {
	label: string,
	value: T
}

export const toOptions = <T>(obj: Record<string, T> = {}): Option<T>[] => {

	return Object.entries(obj).map(([ label, value ]) => ({ label, value }));

}

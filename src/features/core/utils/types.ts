export interface INavMeta {
	title: string
	keywords?: string
	descriptions?: string
}

export interface ISocialMedia {
	id: string | number
	icon: string
	link: string
	title?: string
}

export interface INavCreative {
	navTitles: string[]
}

export interface INavigation {
	id: string | number
	title: string
	name: string
	link: string
	creative?: INavCreative
	meta?: INavMeta
}

export interface INavigationResponse {
	navigations: {
		primary: INavigation[]
		footer: INavigation[]
		social: ISocialMedia[]
	}
}

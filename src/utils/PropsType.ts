export interface MenuItemType {
  id: number
  label: string
  url: string
  desc?: string
}

export interface MenuItemProps {
  menuItems: MenuItemType[]
}

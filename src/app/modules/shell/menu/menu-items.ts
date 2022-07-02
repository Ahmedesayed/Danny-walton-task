import { MenuItem, PrimeIcons } from 'primeng/api';

export const MENU_ITEMS: MenuItem[] = [
  {
    label: '',
    icon: 'logo-icon',
    styleClass: 'mb-0',
    tabindex: '-1',
    disabled: true,
    routerLink: '',
  },
  {
    label: 'Main',
    icon: PrimeIcons.HOME,
    routerLink: '/home',
    tabindex: '0',
  },
  {
    label: 'Live View',
    icon: PrimeIcons.MAP_MARKER,
    routerLink: '/live-view',
    tabindex: '6',
  },
  {
    label: 'Shift type',
    icon: PrimeIcons.CLOCK,
    routerLink: '/shift-types',
    tabindex: '1',
  },
  {
    label: 'Drivers',
    icon: PrimeIcons.USERS,
    routerLink: '/bounties',
    tabindex: '2',
  },
  {
    label: 'Vehicles',
    icon: PrimeIcons.CAR,
    routerLink: '/vehicles',
    tabindex: '3',
  },
  {
    label: 'COD',
    icon: PrimeIcons.MONEY_BILL,
    routerLink: '/cod',
    tabindex: '4',
  },
  {
    label: 'Orders',
    icon: PrimeIcons.TICKET,
    routerLink: '/orders',
    tabindex: '5',
  },
  // {
  //   label: 'Analytics',
  //   icon: PrimeIcons.CHART_LINE,
  //   routerLink: '/analytics',
  //   tabindex: '6',
  // },
  // {
  //   label: 'Roaster',
  //   icon: PrimeIcons.CALENDAR_TIMES,
  //   routerLink: '/roaster',
  //   tabindex: '7',
  // },
  {
    label: 'Sub-Vendors',
    icon: PrimeIcons.BUILDING,
    routerLink: '/sub-vendors',
    tabindex: '7',
  },
  {
    label: 'Shipments',
    icon: PrimeIcons.BOX,
    routerLink: '/shipments',
    tabindex: '8',
  },
];

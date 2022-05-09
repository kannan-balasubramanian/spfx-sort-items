import ISortItem from '../../models/ISortItem';

export interface ISortItemProps {
    sortItem: ISortItem;
    sortItemsCount?: number;

    upButtonClicked(itemId: number);
    downButtonClicked(itemId: number);
}
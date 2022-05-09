import * as React from 'react';

import { Stack, IStackProps, IStackStyles } from 'office-ui-fabric-react/lib/Stack';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';
import { IIconProps } from 'office-ui-fabric-react/';

import { ISortItemsContainerComponentState } from './ISortItemsContainerComponentState';
import { ISortItemsContainerComponentProps } from './ISortItemsContainerComponentProps';
import SortItemComponent from '../SortItem/SortItemComponent';

//Stack related styles
const outerStackTokens = {
    childrenGap: 50
};
const addIcon: IIconProps = { iconName: 'Add' };

let outerStackStyles: Partial<IStackStyles> = {};
let innerStackColumnProps: Partial<IStackProps> = {};

export default class SortItemsContainerComponent extends React.Component<ISortItemsContainerComponentProps, ISortItemsContainerComponentState> {

    constructor(props: ISortItemsContainerComponentProps) {
        super(props);
        this.state = {
            sortItems: []
        };
    }

    public render(): React.ReactElement<{}> {
        // console.log("SortItemsContainerComponent=>render->");
        // console.log(this.state.sortItems);
        return (
            <div>
                <Stack horizontal tokens={outerStackTokens} styles={outerStackStyles}>
                    <Stack verticalAlign="start" {...innerStackColumnProps}>
                        <Stack.Item align="start" >
                            <ActionButton iconProps={addIcon} onClick={this.addButtonClicked.bind(this)} disabled={this.state.sortItems.length >= 5 ? true : false} >Add Item</ActionButton>
                        </Stack.Item>
                        <Stack.Item align="start" >
                            <div>{

                                this.state.sortItems.map((eachSortItem) => {
                                    // console.log("SortItemsContainerComponent=>render=>map=>eachSortItem->");
                                    // console.log(eachSortItem);
                                    return (<div><SortItemComponent key={eachSortItem.id} sortItem={eachSortItem} sortItemsCount={this.state.sortItems.length} upButtonClicked={this.sortItemUpButtonClicked.bind(this)} downButtonClicked={this.sortItemDownButtonClicked.bind(this)}></SortItemComponent></div>);
                                })

                            }</div>
                        </Stack.Item>
                    </Stack>
                </Stack>
            </div>
        );

    }

    private addButtonClicked(event?: React.MouseEvent<HTMLButtonElement>) {
        // if (this.state.sortItems != null) {
        // console.log("SortItemsContainerComponent=>addButtonClicked->SortItemsLength:" + this.state.sortItems.length);
        let sortItemsOnAdd = this.state.sortItems;
        let sortItemLocationId = this.state.sortItems.length;
        let sortItemTitle = "Item " + (this.state.sortItems.length + 1);
        let sortItemId = this.randomNumberGenerator();
        sortItemsOnAdd.push({ id: sortItemId, title: sortItemTitle, locationId: sortItemLocationId });
        this.setState({ sortItems: sortItemsOnAdd.sort((a, b) => a.locationId > b.locationId ? 1 : -1) });
        // this.setState({ sortItems: sortItemsOnAdd });
        // }
    }

    private sortItemUpButtonClicked(itemId: number) {
        // console.log("SortItemsContainerComponent=>sortItemUpButtonClicked->itemId:" + itemId);
        let tempSortItems = this.state.sortItems.sort((a, b) => a.locationId > b.locationId ? 1 : -1);
        let selectedSortItem = tempSortItems.filter(item => item.id == itemId);
        let previousSelectedSortItem = tempSortItems.filter(item => item.locationId == selectedSortItem[0].locationId - 1);
        tempSortItems[selectedSortItem[0].locationId].locationId = selectedSortItem[0].locationId - 1;
        tempSortItems[previousSelectedSortItem[0].locationId].locationId = previousSelectedSortItem[0].locationId + 1;
        this.setState({ sortItems: tempSortItems.sort((a, b) => a.locationId > b.locationId ? 1 : -1) });
    }

    private sortItemDownButtonClicked(itemId: number) {
        // console.log("SortItemsContainerComponent=>sortItemDownButtonClicked->itemId:" + itemId);
        let tempSortItems = this.state.sortItems.sort((a, b) => a.locationId > b.locationId ? 1 : -1);
        let selectedSortItem = tempSortItems.filter(item => item.id == itemId);
        let nextSelectedSortItem = tempSortItems.filter(item => item.locationId == selectedSortItem[0].locationId + 1);
        tempSortItems[selectedSortItem[0].locationId].locationId = selectedSortItem[0].locationId + 1;
        tempSortItems[nextSelectedSortItem[0].locationId].locationId = nextSelectedSortItem[0].locationId - 1;
        this.setState({ sortItems: tempSortItems.sort((a, b) => a.locationId > b.locationId ? 1 : -1) });
    }

    private randomNumberGenerator(): number {
        let min = 1000;
        let max = 9000;
        let rand = min + (Math.random() * (max - min));
        return Math.round(rand);
    }

}
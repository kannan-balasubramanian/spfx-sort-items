import * as React from 'react';

import { Stack, IStackProps, IStackStyles } from 'office-ui-fabric-react/lib/Stack';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { IIconProps } from 'office-ui-fabric-react/';

import { ISortItemState } from './ISortItemState';
import { ISortItemProps } from './ISortItemProps';

//Stack related styles
const outerStackTokens = {
    childrenGap: 50
};
const upIcon: IIconProps = { iconName: 'ChevronUpMed' };
const downIcon: IIconProps = { iconName: 'ChevronDownMed' };

let outerStackStyles: Partial<IStackStyles> = {};
let innerStackColumnProps: Partial<IStackProps> = {};

export default class SortItemComponent extends React.Component<ISortItemProps, ISortItemState> {

    constructor(props: ISortItemProps) {
        // console.log("SortItemComponent=>constructor->");
        super(props);
        if (props != null) {
            this.state = {
                sortItem: props.sortItem,
                sortItemsCount: props.sortItemsCount
            };
        } else {
            this.state = {
                sortItem: undefined,
                sortItemsCount: 0
            };
        }
    }

    public componentWillReceiveProps(props: ISortItemProps) {
        // console.log("SortItemComponent=>componentWillReceiveProps->");
        // console.log(props);
        if (props != null) {
            this.setState({
                sortItem: props.sortItem,
                sortItemsCount: props.sortItemsCount
            });
        }
    }

    public render(): React.ReactElement<{}> {
        // console.log("SortItemComponent=>render->");
        // console.log(this.state.sortItem);
        return (
            <div>
                <Stack horizontal tokens={outerStackTokens} styles={outerStackStyles}>
                    <Stack verticalAlign="start" {...innerStackColumnProps}>
                        <Stack.Item align="start" >
                            {
                                this.state.sortItem != null ? <div>
                                    <IconButton iconProps={upIcon} onClick={this.upButtonClicked.bind(this)} disabled={this.state.sortItem.locationId == 0 ? true : false} />
                                    <IconButton iconProps={downIcon} onClick={this.downButtonClicked.bind(this)} disabled={this.state.sortItem.locationId == (this.state.sortItemsCount - 1) ? true : false} />
                                    <span>({this.state.sortItem.id}) {this.state.sortItem.title}</span>
                                </div> : <div></div>
                            }
                        </Stack.Item>
                    </Stack>
                </Stack>
            </div>
        );

    }

    private upButtonClicked(event?: React.MouseEvent<HTMLButtonElement>) {
        this.props.upButtonClicked(this.state.sortItem.id);
    }

    private downButtonClicked(event?: React.MouseEvent<HTMLButtonElement>) {
        this.props.downButtonClicked(this.state.sortItem.id);
    }

    private randomNumberGenerator(): number {
        let min = 1000;
        let max = 9000;
        let rand = min + (Math.random() * (max - min));
        return Math.round(rand);
    }

}
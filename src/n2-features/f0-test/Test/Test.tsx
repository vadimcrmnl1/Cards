import React, {useState} from "react";
import s from './Test.module.css'
import SuperInputText from "../common/c1-SuperInputText/SuperInputText";
import SuperButton from "../common/c2-SuperButton/SuperButton";
import SuperCheckbox from "../common/c3-SuperCheckbox/SuperCheckbox";
import SuperEditableSpan from "../common/c4-SuperEditableSpan/SuperEditableSpan";
import SuperSelect from "../common/c5-SuperSelect/SuperSelect";
import SuperRadio from "../common/c6-SuperRadio/SuperRadio";
import SuperRange from "../common/c7-SuperRange/SuperRange";
import SuperDebouncedInput from "../common/c8-SuperDebouncedInput/SuperDebouncedInput";
import SuperSort from "../common/c10-SuperSort/SuperSort";
import {Title} from "../../../n1-main/m1-ui/common/u1-title/Title/Title";

const arr = [
    { id: 1, value: 'Pre-junior' },
    { id: 2, value: 'Junior' },
    { id: 3, value: 'Junior +' },

]

export const Test = () => {
    const [value, onChangeOption] = useState(0)
    return (
        <div>
           <Title title={'Tests components'}/>
            <div className={s.commonContainer}>
                <div className={s.common}>
                    <div>Text input</div>
                    <SuperInputText/>
                </div>
                <div className={s.common}>
                    <div>Button</div>
                    <div>
                        <SuperButton style={{marginRight: '10px'}}>DEFAULT</SuperButton>
                        <SuperButton style={{marginRight: '10px'}} xType={'secondary'}>SECONDARY</SuperButton>
                        <SuperButton style={{marginRight: '10px'}} xType={'red'}>RED</SuperButton>
                        <SuperButton style={{marginRight: '10px'}} disabled={true}>DISABLED</SuperButton>
                    </div>
                </div>
                <div className={s.common}>
                    <div>Checkbox</div>
                    <div>
                        <SuperCheckbox/>
                    </div>
                </div>
                <div className={s.common}>
                    <div>Editable span</div>
                    <div>
                        <SuperEditableSpan/>
                    </div>
                </div>
                <div className={s.common}>
                    <div>Select</div>
                    <div>
                        <SuperSelect options={arr} value={value}/>
                    </div>
                </div>
                <div className={s.common}>
                    <div>Radio</div>
                    <div>
                        <SuperRadio options={arr} value={value}/>
                    </div>
                </div>
                <div className={s.common}>
                    <div>Range</div>
                    <div>
                        <SuperRange/>
                    </div>
                </div>
                <div className={s.common}>
                    <div>Debounce input</div>
                    <div>
                        <SuperDebouncedInput/>
                    </div>
                </div>
                <div className={s.common}>
                    <div>Pagination</div>
                    <div>
                        {/*<SuperPagination totalCount={7} page={1} itemsCountForPage={3} id={'1'} onChange={x=>x}/>*/}
                    </div>
                </div>
                <div className={s.common}>
                    <div>Sort</div>
                    <div>
                        <SuperSort value={'test sort'} sort={'test'} onChange={x=>x}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
import React, { useState, useEffect } from "react";
const Checkbox = ({ type = "checkbox", name, checked = false, onChange }) => {
    console.log("Checkbox: ", name, checked);

    return (
        <input type={type} name={name} checked={checked} onChange={onChange} />
    );
};


const CheckboxExample = () => {
    const [checkedItems, setCheckedItems] = useState({}); //plain object as state

    const handleChange = (event) => {
        // updating an object instead of a Map
        setCheckedItems({ ...checkedItems, [event.target.name]: event.target.checked });
    }

    useEffect(() => {
        console.log("checkedItems: ", checkedItems);
    }, [checkedItems]);

    const checkboxes = [
        {
            name: 'housing',
            key: 'housing',
            label: 'Housing',

        },
        {
            name: 'jobAssistance',
            key: 'jobAssistance',
            label: 'Job Assistance',

        },
        {
            name: 'jobGuarantee',
            key: 'jobGuarantee',
            label: 'Job Guarantee',

        }
    ];


    return (
        <div >

            {
                checkboxes.map(item => (
                    <label key={item.key} >
                        <Checkbox name={item.name} checked={checkedItems[item.name]} onChange={handleChange} className="ml-2"/>
                        {item.name}

                    </label>
                ))
            }
        </div>
    );
}
export default CheckboxExample;
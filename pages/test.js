import { useState } from "react";
import Select from "react-select";
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

export default function Test(){
    const [selectedOptions, setSelectedOptions] = useState([])
    const customStyles = {
        control: (base, state) => ({
          ...base,
          background: "#0f172a",
          borderColor: state.isFocused ? "#0ea5e9" : "#000",
          boxShadow: state.isFocused ? null : null,
          color: 'white',
          padding:'10px',
          borderRadius: '15px',
        }),
        menu: base => ({
          ...base,
          // override border radius to match the box
          borderRadius: 0,
          // kill the gap
          marginTop: 0,
          background: "#1e293b",
          opacity: 1,
        }),
        menuList: base => ({
          ...base,
          // kill the white space on first and last option
          padding: 0
        }),
        multiValue: base => ({
            ...base,
            color: '#fff',
            background: '#1e293b',
            border: `1px solid #1e293b`,
            "&:hover": {
                // Overwrittes the different states of border
                borderColor: '#0ea5e9',
            },
            borderRadius: '5px',
          }),
        multiValueLabel: base => ({
            ...base,
            color: '#fff',
        }),
        input: base => ({
            ...base,
            color: '#fff'
        }),
        option: (base) =>({
            ...base,
            '&:hover' :{
                background: '#334155',
                color: '#fff'
            }        
        })
      };
      const options = [
        {
          label: "option 1",
          value: 1
        },
        {
          label: "option 2",
          value: 2
        },
        {
          label: "option 3",
          value: 3
        },
        {
          label: "option 4",
          value: 4
        },
        {
          label: "option 5",
          value: 5
        }
      ];
      return (
        <div className="App">
          <Select value={selectedOptions} styles={customStyles} options={options} isMulti closeMenuOnSelect={false} onChange={(e)=> {
            console.log(e)
            setSelectedOptions(e)
          }}/>
        </div>
      );
}
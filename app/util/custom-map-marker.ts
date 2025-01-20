const CustomMapMarker = ({
  monthly_rent,
  deposit,
}: {
  monthly_rent: string;
  deposit: string;
}): string => {
  const PCContent = `<div style='
     background: white;
     width: 80px;
     height: 50px;
     color: #9747ff;
     border: 1px;
     border-color: #F2F2F7;
     border-style: solid;
     text-align: center;
     font-weight: 600;
     font-size: large;
     border-radius: 10px;
     box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    '>
    ${monthly_rent}
    <div style='font-size: small; color: #645B75;'>${deposit}</div>
    </div>`;

  return PCContent;
};

export default CustomMapMarker;

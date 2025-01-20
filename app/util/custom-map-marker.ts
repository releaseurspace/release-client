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
     border: 2px;
     border-color: #9747ff;
     border-style: solid;
     text-align: center;
     font-weight: 600;
     font-size: large;
     border-radius: 10px;
    '>
    ${monthly_rent}
    <div style='font-size: small;'>${deposit}</div>
    </div>`;

  return PCContent;
};

export default CustomMapMarker;

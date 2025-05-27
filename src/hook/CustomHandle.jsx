// CustomHandle.jsx
const CustomHandle = ({ value, days, style, ...rest }) => {
  return (
    <div
      {...rest}
      style={{
        ...style,
        height: 30,
        width: 30,
        borderRadius: '50%',
        border: '3px solid #F87A08',
        background: '#FFFBF8',
        position: 'absolute',
        left: -4,
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span className="absolute right-[40px] flex flex-col items-end text-right text-xs font-dana leading-[18px] font-bold text-[#525252]">
        <div className="opacity-40 ">{value > 0 ? days[value - 1] : null}</div>
        <div>{value}</div>
        <div className="opacity-40">
          {value < days.length - 1 ? days[value + 1] : null}
        </div>
      </span>
    </div>
  );
};

export default CustomHandle;

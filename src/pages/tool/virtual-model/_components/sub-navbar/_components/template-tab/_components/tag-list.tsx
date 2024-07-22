import { Controller, useFormContext } from 'react-hook-form';
import CenterBox from '../../../../../../../../components/common/center-box';

export interface Tag {
  id: number;
  title: string;
}
export default function TagList({ data }: { data: Tag[] }) {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name="tag"
      render={({ field: { value, onChange } }) => (
        <CenterBox
          sx={{
            flexWrap: 'wrap',
            mt: '1rem',
            justifyContent: 'start',
            gap: '1rem .5rem',
            '> *': {
              flex: 'auto',
              color: '#8591a0',
              padding: '.5rem 2rem',
              height: '2.5rem',
              borderRadius: '1.25rem',
              boxSizing: 'border-box',
              border: '1px solid #8591a0',
              cursor: 'pointer',
              transition: '.1s',
            },
          }}
        >
          {data.map((tag, index) => (
            <CenterBox
              sx={{
                ...(value.find((a: number) => a === tag.id) === undefined
                  ? {}
                  : {
                      color: 'white',
                      boxShadow: '0px 0px 3px inset white',
                      borderColor: 'white',
                    }),
              }}
              key={`subnav_tag_${index}_${tag.id}`}
              onClick={() => {
                console.log(value);

                if (value.find((e: number) => e === tag.id)) {
                  onChange({
                    target: {
                      value: value.filter((e: number) => e !== tag.id),
                    },
                  });
                } else {
                  onChange({ target: { value: [...value, tag.id] } });
                }
              }}
            >
              {tag.title}
            </CenterBox>
          ))}
        </CenterBox>
      )}
    />
  );
}

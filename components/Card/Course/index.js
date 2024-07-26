import { Card, Text, Collapse, Button, Link } from '@nextui-org/react'
import { BiTimeFive } from 'react-icons/bi'
import { useState } from 'react'
import { MdExpandMore } from 'react-icons/md'
import { useTranslation } from 'react-i18next'
import RenderField from '../../RenderField'

export function CourseCard({ course }) {
  const [showMore, setShowMore] = useState(false)
  const { t } = useTranslation()

  return (
    <Card
      css={{
        display: 'flex',
        mw: '500px',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 5,
        height: 'auto',
        paddingBlock: '$10',
      }}
      isHoverable
      key={course.id}
      id={course.id}
    >
      <Card.Header
        css={{
          display: 'flex',
          justifyContent: 'space-between',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Card.Image src={course.image_url} key={course.id}></Card.Image>
      </Card.Header>
      <Button auto color={''} bordered rounded icon={<BiTimeFive />}>
        <Text weight={'bold'} size={'$xs'}>
          {' '}
          <RenderField object={course} field="duration" isHtml={true} maxSize={200} />
        </Text>
      </Button>
      <Link href={`/courses/${course.id}`}>
        <Button color={'primary'} rounded css={{ margin: 10 }} animated shadow>
          <Text weight={'bold'} color={''}>
            {t('courses.startNow')} 🚀
          </Text>
        </Button>
      </Link>
      <Button color={'success'} rounded flat size={'xs'}>
        <RenderField object={course} field="difficulty" isHtml={true} maxSize={200} />
      </Button>
      <Card.Divider />
      <Collapse.Group>
        <div className="mt-7">
          {!showMore && (
            <div>
              <Text>
                <RenderField object={course} field="description" isHtml={true} maxSize={200} />
              </Text>
              <Button
                onPress={() => setShowMore(true)}
                css={{ margin: 'auto', mt: '$10' }}
                color="gradient"
                auto
                icon={<MdExpandMore />}
              ></Button>
            </div>
          )}
          {showMore && (
            <div>
              <Text>
                <RenderField object={course} field="description" isHtml={true} />
              </Text>
              <Button
                css={{ margin: 'auto', mt: '$10' }}
                onPress={() => setShowMore(false)}
                color="gradient"
              >
                {' '}
                ^{' '}
              </Button>
            </div>
          )}
        </div>
      </Collapse.Group>
    </Card>
  )
}

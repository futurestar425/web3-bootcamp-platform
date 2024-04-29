const { db } = require('./initDb')

async function changeUserCohort(user_id, course_id) {
  const nextCohort = await getNextCohort(course_id)
  const nextCohortID = (await db.collection('cohorts').where('name', '==', nextCohort.name).get())
    .docs[0].id
  const userRef = db.collection('users').doc(user_id)
  const user = (await userRef.get()).data()
  const cohortsToKeep = user.cohorts.filter((cohort) => cohort.course_id !== nextCohort.course_id)
  const cohortToBeReplaced = user.cohorts.filter((item) => item.course_id == nextCohort.course_id)
  const userSubscriptionDate = cohortToBeReplaced[0].subscriptionDate
  cohortToBeReplaced.splice(0, 1)
  cohortToBeReplaced.push({
    subscriptionDate: userSubscriptionDate,
    course_id: nextCohort.course_id,
    cohort_id: nextCohortID,
  })
  userRef.update({
    cohorts: [...cohortToBeReplaced, ...cohortsToKeep],
  })
  updateCohortIds(userRef)
}

async function getNextCohort(course_id) {
  const cohorts = await db
    .collection('cohorts')
    .where('course_id', '==', course_id)
    .where('endDate', '>', new Date())
    .orderBy('endDate')
    .get()
  const doc = cohorts.docs[0]
  return { ...doc.data(), id: doc.id }
}

async function updateCohortIds(userRef) {
  const user = (await userRef.get()).data()
  const userCohorts = user.cohorts.map((item) => item.cohort_id)
  userRef.set({ cohort_ids: userCohorts }, { merge: true })
}

module.exports = { changeUserCohort, getNextCohort, updateCohortIds }

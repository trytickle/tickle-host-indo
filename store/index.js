import Vuex from 'vuex';
import { db, auth } from '~/plugins/firebase';
import _ from 'lodash';
import { uploadImage, updateSubmissionField, deletePhotoFromStorage } from '~/services/firebase-service';

const store = () => {
  return new Vuex.Store({
    state: {
      user: null,
      submissions: [],
      selectedDates: [],
      currentAvailabilties: [],
      editingAvailability: undefined,
      bookings: [],
      bookingExperiences: [],
      email: '',
      activePage: '',
      name: '',
      submissionId: '',
      title: '',
      tagline: '',
      label:'Pesta makan malam',
      photos: [null, null, null, null, null, null, null, null, null],
      photoFiles: [null, null, null, null, null, null, null, null, null],
      coverThumbnail: null,
      coverThumbnailUrl: '',
      about: '',
      whatWeDo: '',
      whatIProvide: '',
      whereWeBe: '',
      notes: '',
      status: null,
      whereWeMeet: {
        city: 'Jakarta',
        country: 'Indonesia',
        lat: -6.21462,
        lng: 106.84513
      },
      categoryPrimary: null,
      categorySecondary: null,
      guestRequirements: {
        minimumAge: null,
        kidsAllowed: null,
        servesAlcohol: null,
        requireVerified: null,
        additionalRequirements: '',
        specialCertifications: ''
      },
      bookingOptions: {
        bookBefore: null
      },
      currency: 'idr',
      pricePerPax: null,
      cancellationPolicy: null,
      language: null,
      maxGuestCount: null,
      maxDuration: null,
      bookingExperienceId: null
    },
    mutations: {
      setActivePage(state, payload) {
        state.activePage = payload;
      },
      setSubmissionId(state, payload) {
        state.submissionId = payload;
      },
      setEmail(state, payload) {
        state.email = payload;
      },
      setName(state, payload) {
        state.name = payload;
      },
      setTitle(state, payload) {
        state.title = payload;
      },
      setTagline(state, payload) {
        state.tagline = payload;
      },
      setAbout(state, payload) {
        state.about = payload;
      },
      setWhatWeDo(state, payload) {
        state.whatWeDo = payload;
      },
      setWhereWeBe(state, payload) {
        state.whereWeBe = payload;
      },
      setWhatIProvide(state, payload) {
        state.whatIProvide = payload;
      },
      setNotes(state, payload) {
        state.notes = payload;
      },
      addPhoto(state, payload) {
        state.photos.splice(payload.index, 1, payload.path);
        state.photoFiles.splice(payload.index, 1, payload.file);
      },
      removePhoto(state, payload) {
        state.photos.splice(payload.index, 1, null);
        state.photoFiles.splice(payload.index, 1, null);
      },
      setCoverThumbnail(state, payload) {
        state.coverThumbnail = payload;
      },
      setCoverThumbnailUrl(state, payload) {
        state.coverThumbnailUrl = payload;
      },
      addSelectedDate(state, payload) {
        state.selectedDates.push(payload);
        state.selectedDates.sort(((a,b) => {
          return a.valueOf() - b.valueOf()
        }))
      },
      removeSelectedDate(state, payload) {
        state.selectedDates.splice(state.selectedDates.findIndex(v => v.valueOf() === payload.valueOf()), 1);
        state.selectedDates.sort(((a,b) => {
          return a.valueOf() - b.valueOf()
        }))
      },
      setCurrentAvailabilities(state, payload) {
        state.currentAvailabilties = payload;
      },
      setEditingAvailability(state, payload) {
        state.editingAvailability = payload
      },
      setLatLng(state, payload) {
        state.whereWeMeet.lat = payload.lat;
        state.whereWeMeet.lng = payload.lng;
      },
      setWhereWeMeet(state, payload) {
        state.whereWeMeet = payload;
      },
      setCategory(state, payload) {
        state.categoryPrimary = payload.primary;
        state.categorySecondary = payload.secondary;
      },
      setCancellationPolicy(state, payload) {
        state.cancellationPolicy = payload;
      },
      setBookingOptions(state, payload) {
        state.bookingOptions = payload;
      },
      setPrice(state, payload) {
        state.pricePerPax = payload;
      },
      setDuration(state, payload) {
        state.maxDuration = payload;
      },
      setGuestCount(state, payload) {
        state.maxGuestCount = payload;
      },
      setLanguage(state, payload) {
        state.language = payload;
      },
      setGuestRequirements(state, payload) {
        state.guestRequirements = payload;
      },
      setUserData(state, payload) {
        state.user = payload;
      },
      setSubmissions(state, payload) {
        state.submissions = payload;
      },
      setBookings(state, payload) {
        state.bookings = payload;
      },
      setBookingExperiences(state, payload) {
        state.bookingExperiences = payload;
      },
      setStatus(state, payload) {
        state.status = payload
      },
      setBookingExperienceId(state, payload) {
        state.bookingExperienceId = payload;
      },
      setLabel(state, payload) {
        state.label = payload
      }
    },
    actions: {
      async createOrLoadSubmissionDoc(context) {
        if (auth.currentUser) {
          const submissionDocs = await db.collection("submissions").where('aboutHost.hostId', '==', auth.currentUser.uid).orderBy("lastEdited", "desc").get();
          if (submissionDocs.empty) {
               try {
                const body = {
                  title: "Pengalaman baru dengan " + context.state.user.firstName,
                  userId: auth.currentUser.uid
                };
                await this.$axios.$post(process.env.functionsUrl + "/createSubmission", body);
                localStorage.submissionId = undefined;
                localStorage.isApproved = false;
                location.reload();
              } catch (error) {
                console.error(error);
              }
           
          } else {
            let submissions = [];
            let submissionData = submissionDocs.docs[0].data();
            submissionDocs.forEach(doc => {
              submissions.push(doc.data());
              if (localStorage.submissionId == doc.data().submissionId) {
                submissionData = doc.data();
              }
            });
            localStorage.submissionId = submissionData.submissionId;
            localStorage.isApproved = submissionData.status.isApproved;
            context.commit('setSubmissions', submissions);
            context.commit('setSubmissionId', submissionData.submissionId);
            context.commit('setStatus', submissionData.status);
            context.commit('setTitle', submissionData.title ? submissionData.title : '');
            context.commit('setTagline', submissionData.tagline ? submissionData.tagline : '');
            context.commit('setLabel', submissionData.subtitle ? submissionData.subtitle : 'Pesta makan malam');
            context.commit('setAbout', submissionData.aboutHost.description ? submissionData.aboutHost.description : '');
            context.commit('setWhatWeDo', submissionData.whatWeDo ? submissionData.whatWeDo : '');
            context.commit('setWhatIProvide', submissionData.whatIProvide ? submissionData.whatIProvide : '');
            context.commit('setWhereWeBe', submissionData.whereWeBe ? submissionData.whereWeBe : '');
            context.commit('setNotes', submissionData.notes ? submissionData.notes : '');
            context.commit('setCategory', { primary: submissionData.categoryPrimary != null ? submissionData.categoryPrimary : null, secondary: submissionData.categorySecondary != null ? submissionData.categorySecondary : null });
            context.commit('setPrice', submissionData.pricePerPax != null ? (submissionData.pricePerPax / 100) : null);
            context.commit('setDuration', submissionData.maxDuration != null ? submissionData.maxDuration / 60 : 2);
            context.commit('setGuestCount', submissionData.maxGuestCount != null ? submissionData.maxGuestCount : null);
            context.commit('setLanguage', submissionData.languages ? submissionData.languages[0] : null);
            context.commit('setCancellationPolicy', submissionData.cancellationPolicy != null ? submissionData.cancellationPolicy : null);
            context.commit('setCoverThumbnailUrl', submissionData.coverThumbnail ? submissionData.coverThumbnail : '');
    
            if (submissionData.guestRequirements) {
              context.commit('setGuestRequirements', submissionData.guestRequirements);
            }
            if (submissionData.whereWeMeet) {
              context.commit('setWhereWeMeet', submissionData.whereWeMeet);
            }
            if (submissionData.bookingOptions && submissionData.bookingOptions.bookBefore != null) {
              context.commit('setBookingOptions', submissionData.bookingOptions);
            }
            if (submissionData.media) {
              for (const index in submissionData.media) {
                const mediaUrl = submissionData.media[index];
                context.commit('addPhoto', { index: index, path: mediaUrl, file: null });
              }
            }
            return submissionData;
          }
        }
      },
      async uploadImageToDatabase(context) {
        const photoFiles = context.state.photoFiles;
        for (const index in photoFiles) {
          if (photoFiles[index] !== null) {
            const url = await uploadImage(context.state.submissionId, photoFiles[index]);
            if (url) {
              context.commit('addPhoto', { index: index, path: url, file: null });
              await updateSubmissionField('media', context.state.photos, context.state.submissionId);
            }
          }
        }
        if (context.state.coverThumbnail) {
            const url = await uploadImage(context.state.submissionId, context.state.coverThumbnail);
            context.commit('setCoverThumbnailUrl', url);
            await updateSubmissionField('coverThumbnail', url, context.state.submissionId);
        }
      },
      async createExperience(context, payload) {
        try {
          const body = {
            title: "Pengalaman baru dengan " + context.state.user.firstName,
            userId: auth.currentUser.uid
          };
          await this.$axios.$post(process.env.functionsUrl + "/createSubmission", body);
          localStorage.submissionId = undefined;
          localStorage.isApproved = false;
          location.reload();
        } catch (error) {
          console.error(error);
        }
      },
      async removeImageFromDatabase(context, payload) {
        await deletePhotoFromStorage(context.state.photos[payload]);
        context.commit('removePhoto', { index: payload });
        await updateSubmissionField('media', context.state.photos, context.state.submissionId);
      },
      async loadBookings(context) {
        if (auth.currentUser) {
          let bookings = [];
          let bookingExperiences = [];
          const bookingDocs = await db.collection("bookings").where("hostId", '==', auth.currentUser.uid).get();
          if (!bookingDocs.empty) {
            bookingDocs.forEach(doc => {
              const booking = doc.data();
              if (!booking.hasBeenCanceled && !booking.hasFinished) {
                bookings.push(booking);
              }
            });
            bookings.forEach((booking) => {
              let i = 0;
              let found = false;
              bookingExperiences.forEach((el, index) => {
                if (el.experienceId === booking.experienceId) {
                  i = index;
                  found = true;
                }
              });
              if (!found) {
                booking["count"] = 1;
                bookingExperiences.push(booking);
              } else {
                bookingExperiences[i].count = bookingExperiences[i].count + 1;
              }
            });
            context.commit('setBookings', bookings);
            context.commit('setBookingExperiences', bookingExperiences);
          }
        }
      },
      async loadAvailabilities(context) {
       if (localStorage.submissionId) {
         const availDocs = await db.collection("submissions").doc(localStorage.submissionId).collection("availability").get();
         let avails = []
         availDocs.forEach(avail => {
          avails.push(avail.data())
         })
         context.commit('setCurrentAvailabilities', avails)
       }
      },
      async loadCurrentUser(context) {
        if (auth.currentUser) {
          const userDoc = await db.collection("users").doc(auth.currentUser.uid).get();
          if (userDoc.exists) {
            context.commit('setUserData', userDoc.data());
            context.commit('setName', userDoc.data().firstName);
            context.commit('setEmail', userDoc.data().email);
          }
        }
      },
      async saveSubmissionAndExperience(context) {
        try {
          const body = {
            submissionId: context.state.submissionId,
            title : context.state.title,
            subtitle : context.state.label,
            tagline : context.state.tagline,
            maxDuration : context.state.maxDuration,
            minDuration : 0,
            languages : [context.state.language],
            whatWeDo : context.state.whatWeDo,
            whatIProvide : context.state.whatIProvide,
            whereWeBe : context.state.whereWeBe,
            maxGuestCount : context.state.maxGuestCount,
            minGuestCount : 0,
            notes : context.state.notes,
            bookingOptions : context.state.bookingOptions,
            cancellationPolicy : context.state.cancellationPolicy,
            categoryPrimary : context.state.categoryPrimary,
            categorySecondary : context.state.categorySecondary,
            currency : context.state.currency,
            guestRequirements : context.state.guestRequirements,
            media : context.state.photos,
            pricePerPax : context.state.pricePerPax,
            whereWeMeet : context.state.whereWeMeet,
            aboutHost : {description:context.state.about,hostId: auth.currentUser.uid}
          };
          console.log(body);
           await this.$axios.$post(process.env.functionsUrl + "/updateSubmissionAndExperience", body);
        } catch (error) {
          console.error(error);
        }
      }
    }
  });
};

export default store;

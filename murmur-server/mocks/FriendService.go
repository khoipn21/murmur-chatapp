// Code generated by mockery v2.46.2. DO NOT EDIT.

package mocks

import (
	model "murmur-server/model"

	mock "github.com/stretchr/testify/mock"
)

// FriendService is an autogenerated mock type for the FriendService type
type FriendService struct {
	mock.Mock
}

// DeleteRequest provides a mock function with given fields: memberId, userId
func (_m *FriendService) DeleteRequest(memberId string, userId string) error {
	ret := _m.Called(memberId, userId)

	if len(ret) == 0 {
		panic("no return value specified for DeleteRequest")
	}

	var r0 error
	if rf, ok := ret.Get(0).(func(string, string) error); ok {
		r0 = rf(memberId, userId)
	} else {
		r0 = ret.Error(0)
	}

	return r0
}

// GetFriends provides a mock function with given fields: id
func (_m *FriendService) GetFriends(id string) (*[]model.Friend, error) {
	ret := _m.Called(id)

	if len(ret) == 0 {
		panic("no return value specified for GetFriends")
	}

	var r0 *[]model.Friend
	var r1 error
	if rf, ok := ret.Get(0).(func(string) (*[]model.Friend, error)); ok {
		return rf(id)
	}
	if rf, ok := ret.Get(0).(func(string) *[]model.Friend); ok {
		r0 = rf(id)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*[]model.Friend)
		}
	}

	if rf, ok := ret.Get(1).(func(string) error); ok {
		r1 = rf(id)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// GetMemberById provides a mock function with given fields: id
func (_m *FriendService) GetMemberById(id string) (*model.User, error) {
	ret := _m.Called(id)

	if len(ret) == 0 {
		panic("no return value specified for GetMemberById")
	}

	var r0 *model.User
	var r1 error
	if rf, ok := ret.Get(0).(func(string) (*model.User, error)); ok {
		return rf(id)
	}
	if rf, ok := ret.Get(0).(func(string) *model.User); ok {
		r0 = rf(id)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*model.User)
		}
	}

	if rf, ok := ret.Get(1).(func(string) error); ok {
		r1 = rf(id)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// GetRequests provides a mock function with given fields: id
func (_m *FriendService) GetRequests(id string) (*[]model.FriendRequest, error) {
	ret := _m.Called(id)

	if len(ret) == 0 {
		panic("no return value specified for GetRequests")
	}

	var r0 *[]model.FriendRequest
	var r1 error
	if rf, ok := ret.Get(0).(func(string) (*[]model.FriendRequest, error)); ok {
		return rf(id)
	}
	if rf, ok := ret.Get(0).(func(string) *[]model.FriendRequest); ok {
		r0 = rf(id)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*[]model.FriendRequest)
		}
	}

	if rf, ok := ret.Get(1).(func(string) error); ok {
		r1 = rf(id)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// RemoveFriend provides a mock function with given fields: memberId, userId
func (_m *FriendService) RemoveFriend(memberId string, userId string) error {
	ret := _m.Called(memberId, userId)

	if len(ret) == 0 {
		panic("no return value specified for RemoveFriend")
	}

	var r0 error
	if rf, ok := ret.Get(0).(func(string, string) error); ok {
		r0 = rf(memberId, userId)
	} else {
		r0 = ret.Error(0)
	}

	return r0
}

// SaveRequests provides a mock function with given fields: user
func (_m *FriendService) SaveRequests(user *model.User) error {
	ret := _m.Called(user)

	if len(ret) == 0 {
		panic("no return value specified for SaveRequests")
	}

	var r0 error
	if rf, ok := ret.Get(0).(func(*model.User) error); ok {
		r0 = rf(user)
	} else {
		r0 = ret.Error(0)
	}

	return r0
}

// NewFriendService creates a new instance of FriendService. It also registers a testing interface on the mock and a cleanup function to assert the mocks expectations.
// The first argument is typically a *testing.T value.
func NewFriendService(t interface {
	mock.TestingT
	Cleanup(func())
}) *FriendService {
	mock := &FriendService{}
	mock.Mock.Test(t)

	t.Cleanup(func() { mock.AssertExpectations(t) })

	return mock
}

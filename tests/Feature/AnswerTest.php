<?php

use App\Models\User;
use App\Models\Reply;
use App\Models\Thread;

beforeEach(function(){
    $this->owner = User::factory()->create();
    $this->anotherUser = User::factory()->create();
    $this->thread = Thread::factory()->create(['user_id' => $this->owner->id]);
    $this->reply = Reply::factory()->create(['thread_id' => $this->thread->id, 'user_id' => $this->owner->id]);
});

it('redirect unauthenticated user', function(){
    $this->post(route('answer', $this->thread->slug), [
        'answer_id' => $this->reply->id
    ])->assertRedirect(route('login'));
    $this->assertGuest();
});

it('can not marked best answer by other than the owner of thread', function(){
    $this->actingAs($this->anotherUser)->post(route('answer', $this->thread->slug), [
        'answer_id' => $this->reply->id
    ])->assertStatus(403);
});

it('can marked the best anser by owener of the thread', function(){
    $response = $this->actingAs($this->owner)->post(route('answer', $this->thread->slug), [
        'answer_id' => $this->reply->id
    ]);
    expect($response->getRequest()->answer_id)->toEqual($this->reply->id);
});
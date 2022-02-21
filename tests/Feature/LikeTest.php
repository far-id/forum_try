<?php

use App\Models\Reply;
use App\Models\User;
use App\Models\Thread;

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->thread = Thread::factory()->create();
    $this->reply = Reply::factory()->create(['thread_id' => $this->thread->id, 'user_id' => $this->user->id]);
});

test('thread can liked by authenticated user', function () {
    $this->withoutExceptionHandling();
    $this->actingAs($this->user)->post(route('likes'), [
        'model' => 'thread',
        'id' => $this->thread->id
    ])->assertredirect();
    $this->assertDatabaseHas('likes', ['user_id' => $this->user->id, 'likeable_id' => $this->thread->id, 'likeable_type' => 'App\Models\Thread']);
});

test('reply can liked by authenticated user', function () {
    $this->withoutExceptionHandling();
    $this->actingAs($this->user)->post(route('likes'), [
        'model' => 'reply',
        'id' => $this->reply->id
    ])->assertredirect();
    $this->assertDatabaseHas('likes', ['user_id' => $this->user->id, 'likeable_id' => $this->reply->id, 'likeable_type' => 'App\Models\Reply']);
});

it('can not liked by unauthenticated anauthenticated', function () {
    $this->post(route('likes'), [
        'model' => 'thread',
        'id' => $this->thread->id
    ])->assertRedirect(route('login'));
});

it('can not be liked aside from thread or reply', function(){
    $this->actingAs($this->user)->post(route('likes'), [
        'model' => 'saf',
        'id' => 1
    ])->assertStatus(404);
});


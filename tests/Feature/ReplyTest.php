<?php

use App\Models\User;
use App\Models\Reply;
use App\Models\Thread;

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->thread = Thread::factory()->create();
});

it('an authenticated user can replies the thread', function(){
    $this->actingAs($this->user)->post(route('threads.reply', $this->thread->slug), [
        'body' => 'this is the reply body'
    ]);

    expect($this->thread->replies()->count())->toBe(1);
});

it('user can not reply the thread if he doest not authenticated',function(){
    $this->post(route('threads.reply', $this->thread->slug), [
        'body' => 'this is the reply body'
    ])->assertRedirect(route('login'));

    expect($this->thread->replies()->count())->toBe(0);
});

it('cant be reply if he does not fill required fill', function(){
    $response = $this->actingAs($this->user)->post(route('threads.reply', $this->thread->slug), []);

    $response->assertRedirect()->assertSessionHasErrors('body');
    expect($this->thread->replies()->count())->toBe(0);
});

it('can not reply if the thread is does not exist', function(){
    $response = $this->actingAs($this->user)->post(route('threads.reply', 'not-exist-thread'), [
        'body' => 'this is the reply body'
    ]);

    $response->assertStatus(404);
});

it('can replies the reply', function(){
    $anotherUser = User::factory()->create();
    $reply = Reply::factory()->create(['thread_id' => $this->thread->id, 'user_id' => $this->user->id]);
    $this->actingAs($anotherUser)->post(route('threads.reply', $this->thread->slug), [
        'body' => 'this is the reply body',
        'parent_id' => $reply->id
    ]);

    expect($reply->children()->count())->toBe(1);
});
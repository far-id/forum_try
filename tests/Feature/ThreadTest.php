<?php

use App\Models\Thread;
use App\Models\User;

beforeEach(function () {
    $this->user = User::factory()->create();
});

it('can view create page', function(){
    $this->get(route('threads.create'))->assertStatus(200);
});

test('an authorize user can create new thread', function () {
    // $this->withoutExceptionHandling();
    $thread = Thread::factory()->make();
    $response = $this->actingAs($this->user)->post(route('threads.store'), $thread->toArray());

    $response->assertStatus(302);
    expect($response->getStatusCode())->toBe(302);
    $response->assertRedirect();
});

test('an authenticated user cant create new thread if he doest fill all fields', function () {
    $response = $this->actingAs($this->user)->post(route('threads.store'), []);

    $response->assertStatus(302);
    expect($response->getStatusCode())->toBe(302);
    $response->assertRedirect();
});

test('a guest cant create new thread', function () {
    $thread = Thread::factory()->make();
    $this->post(route('threads.store'), $thread->toArray());

    $this->assertGuest();
});

it('can view update page', function () {
    $this->withoutExceptionHandling();
    $thread = Thread::factory()->create();
    $this->get(route('threads.edit', $thread->slug))->assertStatus(200);
});

test('user can be update the thread if he is the owner of thread', function(){
    $thread = Thread::factory()->create(['user_id' => $this->user->id]);
    expect($thread->user_id)->toEqual($this->user->id);
    $response = $this->actingAs($this->user)->put(route('threads.update', $thread->slug), [
        'title' => 'this is the updated thread',
        'body' => 'this is the updated body',
        'category_id' => '1'
    ]);

    $response->assertRedirect();
});

test('user can not be update the thread if he is not the owner of thread', function(){
    $thread = Thread::factory()->create();
    $response = $this->actingAs($this->user)->put(route('threads.update', $thread->slug), [
        'title' => 'this is the updated thread',
        'body' => 'this is the updated body',
        'category_id' => '1'
    ]);

    expect($response->getStatusCode())->toBe(403);
});

test('can delete the thread if he is the owner of thread', function() {
    $thread = Thread::factory()->create(['user_id' => $this->user->id]);
    expect($thread->user_id)->toEqual($this->user->id);
    $response = $this->actingAs($this->user)->delete(route('threads.destroy', $thread->slug));

    $response->assertRedirect(route('threads.index'));
    $this->assertDeleted($thread);
});
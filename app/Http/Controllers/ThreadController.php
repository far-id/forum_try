<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReplyResource;
use App\Models\Thread;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Resources\ThreadResource;

class ThreadController extends Controller
{
    public function __construck()
    {
        $this->middlewatre('auth')->except(['index', 'show']);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $threads = Thread::query()->with('category', 'user')->withCount('likes', 'replies')
                ->when(request()->category, fn ($query, $slug) => 
                        $query->whereBelongsTo( Category::whereSlug($slug)->first())
                        ->when(request()->search, fn ($query, $search) => $query->where('title', 'like', "%$search%"))
                )->when(request()->search, fn ($query, $search) => 
                        $query->where('title', 'like', "%$search%")
                        ->when(request()->category, fn ($query, $slug) => $query->whereBelongsTo( Category::whereSlug($slug)->first()))
                )->when(!request()->order, fn ($query) => 
                        $query->latest()
                )->when(request()->order, function ($q, $order) {
                    switch ($order) {
                        case 'latest' : $q->latest(); break;
                        case 'oldest' : $q->oldest(); break;
                        case 'most-liked' : $q->orderBy('likes_count', 'desc'); break;
                        case 'most-replied' : $q->orderBy('replies_count', 'desc'); break;
                        case 'popular-this-week' : $q->whereBetween('created_at', [now()->subWeek(), now()])->orderBy('replies_count', 'desc'); break;
                        case 'popular-this-month' : $q->whereBetween('created_at', [now()->subMonth(), now()])->orderBy('replies_count', 'desc'); break;
                        case 'popular-this-year': $q->whereBetween('created_at', [now()->subYear(), now()])->orderBy('replies_count', 'desc'); break;
                        case 'popular-all-time': $q->orderBy('replies_count', 'desc'); break;
                        case 'my-questions' : $q->where('user_id', auth()->id()); break;
                        case 'my-participated' : $q->whereHas('replies', fn ($reply) => $reply->where('user_id', auth()->id())); break;
                        case 'my-best-answers' : $q->whereHas('answer', fn ($reply) => $reply->where('user_id', auth()->id())); break;
                        case 'solved' : $q->whereHas('answer'); break;
                        case 'unsolved': $q->whereDoesntHave('answer')->whereHas('replies'); break;
                        case 'no-reply-yet': $q->whereDoesntHave('replies'); break;
                        default:abort(404);break;
                    }
                }

                )->paginate()->withQueryString();
        return inertia('Threads/Index', [
            'threads' => ThreadResource::collection($threads),
            'categories' => Category::all(),
            // 'filter' => request()->only(['search', 'page', 'category']),
            'filter' => [
                'search' => request()->search ?? '',
                'page' => request()->page ?? '',
                'category' => request()->category ?? '',
                'order' => request()->order ?? '',
            ]

        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return inertia('Threads/Create', [
            'categories' => Category::get()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'body' => 'required',
            'category_id' => 'required'
        ]);

        $thread = $request->user()->threads()->create([
            'category_id' => $request->category_id,
            'title' => $request->title,
            'slug' => \Illuminate\Support\Str::slug($request->title. '-' . Str::random(4)),
            'body' => $request->body,
        ]);

        return redirect()->route('threads.show', $thread);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Thread  $thread
     * @return \Illuminate\Http\Response
     */
    public function show(Thread $thread)
    {
        return inertia('Threads/Show', [
            'thread' => new ThreadResource($thread->loadCount('likes', 'replies')),
            'replies' => ReplyResource::collection($thread->replies()->withCount('likes')->whereNull('parent_id')->get()),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Thread  $thread
     * @return \Illuminate\Http\Response
     */
    public function edit(Thread $thread)
    {
        return inertia('Threads/Edit', [
            'thread' => $thread,
            'categories' => Category::all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Thread  $thread
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Thread $thread)
    {
        $this->authorize('update', $thread);
        $request->validate([
            'title' => 'required',
            'body' => 'required',
            'category_id' => 'required'
        ]);

        $thread->update([
            'category_id' => $request->category_id,
            'title' => $request->title,
            'body' => $request->body,
        ]);

        return redirect()->route('threads.show', $thread);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Thread  $thread
     * @return \Illuminate\Http\Response
     */
    public function destroy(Thread $thread)
    {
        $this->authorize('delete', $thread);
        $thread->delete();
        
        return redirect(route('threads.index'));
    }
}

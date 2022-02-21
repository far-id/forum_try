<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class LikeController extends Controller
{
    public function __construct()
    {
        return $this->middleware('auth');
    }
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        abort_if(!Str::contains($request->model, ["reply", "thread"]), 404);

        $fullNameSpaceModel = "App\Models\\" . Str::studly($request->model);
        $model = $fullNameSpaceModel::find($request->id);
        $toggle = $model->likes()->where('user_id', $request->user()->id)->exists() ? 'delete' : 'save';
        if ($toggle === 'delete') {
            $model->likes()->where('user_id', $request->user()->id)->delete();
        } else {
            $request->user()->likes()->save($model->likes()->make());
        }

        return back();


        // return redirect()->back();


        // $key = $request->keys()[0];
        // switch ($key) {
        //     case 'thread':
        //         $thread = Thread::find($request->get($key));
        //         $toggle = $thread->likes()->where('user_id', $request->user()->id)->exists() ? 'delete' : 'save';
        //         $request->user()->likes()->$toggle($thread->likes()->make());
        //         break;

        //     case 'reply':
        //         $reply = Reply::find($request->get($key));
        //         $toggle = $reply->likes()->where('user_id', $request->user()->id)->exists() ? 'delete' : 'save';
        //         $request->user()->likes()->$toggle($reply->likes()->make());
        //         break;

        //     default:
        //         abort(404);
        //         break;
        // }
    }
}

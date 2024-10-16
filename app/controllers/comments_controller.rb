class CommentsController < ApplicationController
  before_action :set_itinerary
  before_action :authenticate_user!
  before_action :set_comment, only: %i[ show update destroy ]


  def index
    @comments = Comment.all

    render json: @comments
  end

  def show
    render json: @comment
  end

  def create
    @comment = @itinerary.comments.build(comment_params)
    @comment.user = current_user

    if @comment.save
      redirect_to itinerary_path(@itinerary), notice: 'Comment was successfully created.'
    else
      redirect_to itinerary_path(@itinerary), alert: 'Failed to create comment.'
    end
  end


  def update
    if @comment.update(comment_params)
      render json: @comment
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @comment.destroy!
  end

  private
    def set_comment
      @comment = Comment.find(params[:id])
    end
      
    def set_itinerary
      @itinerary = Itinerary.find(params[:itinerary_id])
    end

    def comment_params
      params.require(:comment).permit(:user_id, :itinerary_id, :content)
    end
end


# frozen_string_literal: true

class SessionsController < ApplicationController
  # create, destroyアクションに対して、CSRF保護を無効にする
  skip_before_action :verify_authenticity_token, only: :create

  def create
    # 引数の条件に該当するデータがあればそれを返す。なければ新規作成する
    user = User.find_or_create_by(provider: params[:provider], uid: params[:uid])
    if user.save
      redirect_to 'http://localhost:4000/'
    else
      render json: { error: 'ログインに失敗しました' }, status: :unprocessable_entity
    end
  rescue StandardError => e
    render json: { error: e.message }, status: :internal_server_error
  end

  # def destroy
  #   session[user_id]
  #   redirect_to f "http://localhost:4000/"
  # end
end

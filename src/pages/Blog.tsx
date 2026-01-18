import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FloatingCharacters } from "@/components/FloatingCharacters";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Plus, Image, Video, X, Upload, Trash2, Edit, Eye, EyeOff, LogIn, LogOut, Shield, ZoomIn } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import TechCupJourneyCard from "@/components/TechCupJourneyCard";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface BlogPost {
  id: string;
  title: string;
  content: string | null;
  cover_image_url: string | null;
  video_url: string | null;
  author_name: string | null;
  is_published: boolean | null;
  created_at: string;
  updated_at: string;
}

const Blog = () => {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [removeExistingImage, setRemoveExistingImage] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, [isAdmin]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      let query = supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
      
      if (!isAdmin) {
        query = query.eq("is_published", true);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast.error("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    
    const { error } = await supabase.storage
      .from("blog-media")
      .upload(fileName, file);
    
    if (error) {
      console.error("Upload error:", error);
      return null;
    }
    
    const { data } = supabase.storage.from("blog-media").getPublicUrl(fileName);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAdmin) {
      toast.error("Only admins can manage posts");
      return;
    }
    
    setUploading(true);

    try {
      let imageUrl = existingImageUrl;
      
      if (removeExistingImage) {
        imageUrl = null;
      }
      
      if (coverImage) {
        imageUrl = await uploadImage(coverImage);
      }

      const postData = {
        title,
        content,
        cover_image_url: imageUrl,
        video_url: videoUrl || null,
        is_published: isPublished,
      };

      if (editingPost) {
        const { error } = await supabase
          .from("blog_posts")
          .update(postData)
          .eq("id", editingPost.id);
        
        if (error) throw error;
        toast.success("Post updated!");
      } else {
        const { error } = await supabase
          .from("blog_posts")
          .insert([postData]);
        
        if (error) throw error;
        toast.success("Post created!");
      }

      resetForm();
      fetchPosts();
    } catch (error) {
      console.error("Error saving post:", error);
      toast.error("Failed to save post");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) throw error;
      toast.success("Post deleted!");
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post");
    }
  };

  const togglePublish = async (post: BlogPost) => {
    try {
      const { error } = await supabase
        .from("blog_posts")
        .update({ is_published: !post.is_published })
        .eq("id", post.id);
      
      if (error) throw error;
      toast.success(post.is_published ? "Post unpublished" : "Post published!");
      fetchPosts();
    } catch (error) {
      console.error("Error toggling publish:", error);
      toast.error("Failed to update post");
    }
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setCoverImage(null);
    setVideoUrl("");
    setIsPublished(true);
    setShowCreateForm(false);
    setEditingPost(null);
    setExistingImageUrl(null);
    setRemoveExistingImage(false);
  };

  const startEdit = (post: BlogPost) => {
    setEditingPost(post);
    setTitle(post.title);
    setContent(post.content || "");
    setVideoUrl(post.video_url || "");
    setIsPublished(post.is_published || false);
    setExistingImageUrl(post.cover_image_url || null);
    setRemoveExistingImage(false);
    setShowCreateForm(true);
  };

  const getEmbedUrl = (url: string) => {
    // Check if the URL is a YouTube link
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoId = url.split(/(?:v=|\/)([0-9A-Za-z_-]{11})/)[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    // Check if the URL is a Google Drive link
    if (url.includes("drive.google.com")) {
      const fileId = url.split("/d/")[1]?.split("/")[0];
      return `https://drive.google.com/file/d/${fileId}/preview`;
    }

    return null; // Return null if the URL is not valid
  };

  return (
    <main className="bg-background min-h-screen overflow-x-hidden">
      <Navbar />
      <FloatingCharacters />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium"
            >
              <BookOpen size={16} />
              Section A2 Stories
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white">
              The A2 Blog
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Stories, memories, and moments captured in words and pictures.
            </p>

            {/* Auth Status */}
            <div className="flex items-center justify-center gap-3">
              {authLoading ? (
                <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
              ) : user ? (
                <div className="flex items-center gap-3">
                  {isAdmin && (
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-medium">
                      <Shield size={12} />
                      Admin
                    </span>
                  )}
                  <span className="text-white/60 text-sm">{user.email}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={signOut}
                    className="text-white/60 hover:text-white"
                  >
                    <LogOut size={16} className="mr-1" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Link to="/auth">
                  <Button variant="outline" size="sm" className="bg-white/5 border-white/10 hover:bg-white/10">
                    <LogIn size={16} className="mr-2" />
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Admin Controls */}
      <AnimatePresence>
        {isAdmin && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-6xl mx-auto px-6 py-4"
          >
            <div className="flex justify-between items-center p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <span className="text-emerald-400 font-medium flex items-center gap-2">
                <Shield size={16} />
                Admin Mode Active
              </span>
              <Button
                onClick={() => setShowCreateForm(true)}
                className="bg-emerald-500 hover:bg-emerald-600"
              >
                <Plus size={16} className="mr-2" />
                New Post
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create/Edit Form Modal */}
      <AnimatePresence>
        {showCreateForm && isAdmin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={() => resetForm()}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background border border-white/10 rounded-2xl p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {editingPost ? "Edit Post" : "Create New Post"}
                </h2>
                <Button variant="ghost" size="icon" onClick={resetForm}>
                  <X size={20} />
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Title</label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter post title..."
                    required
                    className="bg-white/5 border-white/10"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">Content</label>
                  <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your story..."
                    rows={6}
                    className="bg-white/5 border-white/10"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">
                    <Image size={14} className="inline mr-1" />
                    Cover Image
                  </label>
                  {existingImageUrl && !removeExistingImage && !coverImage ? (
                    <div className="space-y-2">
                      <div className="relative rounded-lg overflow-hidden">
                        <img
                          src={existingImageUrl}
                          alt="Current cover"
                          className="w-full h-32 object-cover"
                        />
                        <Button
                          type="button"
                          size="sm"
                          variant="destructive"
                          onClick={() => setRemoveExistingImage(true)}
                          className="absolute top-2 right-2"
                        >
                          <Trash2 size={14} className="mr-1" />
                          Remove
                        </Button>
                      </div>
                      <p className="text-xs text-white/40">Or upload a new image to replace:</p>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {removeExistingImage && (
                        <div className="flex items-center justify-between p-2 rounded bg-red-500/10 border border-red-500/20">
                          <span className="text-xs text-red-400">Image will be removed</span>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => setRemoveExistingImage(false)}
                            className="text-xs h-6"
                          >
                            Undo
                          </Button>
                        </div>
                      )}
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">
                    <Video size={14} className="inline mr-1" />
                    Video URL (YouTube, etc.)
                  </label>
                  <Input
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://youtube.com/watch?v=..."
                    className="bg-white/5 border-white/10"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="published"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="published" className="text-sm text-white/60">
                    Publish immediately
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={resetForm} className="flex-1">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={uploading} className="flex-1 bg-emerald-500 hover:bg-emerald-600">
                    {uploading ? (
                      <>
                        <Upload size={16} className="mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>Save Post</>
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

          {/* TechCup Journey Card */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-6">
          <TechCupJourneyCard transparent/>
        </div>
      </section>


      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          {loading ? (
            <div className="text-center py-20">
              <div className="w-12 h-12 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-white/40 mt-4">Loading posts...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen size={48} className="mx-auto text-white/20 mb-4" />
              <p className="text-white/40">No posts yet. {isAdmin && "Create your first post!"}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all duration-300"
                >
                  {/* Media Section - Dynamic height based on content */}
                  {(post.cover_image_url || post.video_url) ? (
                    <div className="space-y-2">
                      {/* Cover Image */}
                      {post.cover_image_url && (
                        <div 
                          className="overflow-hidden relative cursor-pointer group/img"
                          onClick={() => setSelectedImage(post.cover_image_url)}
                        >
                          <img
                            src={post.cover_image_url}
                            alt={post.title}
                            className="w-full h-auto max-h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/30 transition-colors flex items-center justify-center">
                            <ZoomIn className="text-white opacity-0 group-hover/img:opacity-100 transition-opacity" size={32} />
                          </div>
                        </div>
                      )}

                      {/* Video Embed */}
                      {post.video_url && (
                        <div className="aspect-video overflow-hidden">
                          <iframe
                            src={getEmbedUrl(post.video_url) || undefined}
                            title={post.title}
                            className="w-full h-full"
                            frameBorder="0"
                            allowFullScreen
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="h-32 bg-gradient-to-br from-emerald-500/20 to-purple-500/20 flex items-center justify-center">
                      <BookOpen size={40} className="text-white/20" />
                    </div>
                  )}

                  {/* Draft indicator */}
                  {!post.is_published && (
                    <div className="absolute top-4 left-4 bg-yellow-500/80 text-black text-xs px-2 py-1 rounded-full font-medium">
                      Draft
                    </div>
                  )}

                  <div className="p-5">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                      {post.title}
                    </h3>
                    {post.content && (
                      <p className="text-white/60 text-sm line-clamp-3 mb-4">
                        {post.content}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-xs text-white/40">
                      <span>{new Date(post.created_at).toLocaleDateString()}</span>
                      <span>{post.author_name}</span>
                    </div>

                    {/* Admin Actions */}
                    {isAdmin && (
                      <div className="flex gap-2 mt-4 pt-4 border-t border-white/10">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => startEdit(post)}
                          className="flex-1"
                        >
                          <Edit size={14} className="mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => togglePublish(post)}
                          className="flex-1"
                        >
                          {post.is_published ? <EyeOff size={14} className="mr-1" /> : <Eye size={14} className="mr-1" />}
                          {post.is_published ? "Hide" : "Publish"}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(post.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Image Fullscreen Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-transparent border-none">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Full size"
              className="w-full h-full object-contain rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </main>
  );
};

export default Blog;




